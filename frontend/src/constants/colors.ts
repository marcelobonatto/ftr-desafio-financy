export const COLOR_VARIANTS = {
    blue: "bg-blue-light text-blue-dark",
    purple: "bg-purple-light text-purple-dark",
    pink: "bg-pink-light text-pink-dark",
    red: "bg-red-light text-red-dark",
    orange: "bg-orange-light text-orange-dark",
    yellow: "bg-yellow-light text-yellow-dark",
    green: "bg-green-light text-green-dark",
} as const;

export const COLOR_OPTIONS = [
    { name: "green", hexClass: "bg-green-base" },
    { name: "blue", hexClass: "bg-blue-base" },
    { name: "purple", hexClass: "bg-purple-base" },
    { name: "pink", hexClass: "bg-pink-base" },
    { name: "red", hexClass: "bg-red-base" },
    { name: "orange", hexClass: "bg-orange-base" },
    { name: "yellow", hexClass: "bg-yellow-base" },
] as const;