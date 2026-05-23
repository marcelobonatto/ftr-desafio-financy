import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, ServerError } from "@apollo/client/errors";
import { useAuthStore } from "@/stores/auth";
import { isTokenExpired } from "@/utils";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/graphql",
});

function getPersistedAuth() {
  try {
    const storage = localStorage.getItem("auth-storage");

    if (!storage) return null;
    const parsed = JSON.parse(storage);

    return parsed?.state || null;
  } catch {
    return null;
  }
}

async function refreshAccessToken() {
  const auth = getPersistedAuth();

  if (!auth?.refreshToken) return null;

  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation {
          refreshToken(token: "${auth.refreshToken}") {
            token
          }
        }
      `
    })
  });

  const json = await response.json();

  return json.data?.refreshToken?.token;
}

const authLink = new SetContextLink(async (prevContext) => {
  const auth = getPersistedAuth();

  let token = auth?.token;

  if (token && isTokenExpired(token)) {
    token = await refreshAccessToken();

    if (!token) {
      useAuthStore.getState().logout();

      return {};
    }

    useAuthStore.setState({ token });
  }

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error, operation }) => {
  if (error && CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      if (
        err.extensions?.code === "UNAUTHENTICATED" ||
        err.message.includes("Unauthorized")
      ) {
        localStorage.removeItem("auth-storage");

        useAuthStore.getState().logout();

        operation.getContext().client?.clearStore();

        window.location.href = "/login";
        return;
      }
    }
  }

  if (error && ServerError.is(error) && error.statusCode === 401) {
    localStorage.removeItem("auth-storage");
    useAuthStore.getState().logout();
    window.location.href = "/login";
    return;
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
