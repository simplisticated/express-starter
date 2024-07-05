module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    testMatch: ["**/src/**/**.test.ts"],
    setupFiles: ["dotenv/config"],
    passWithNoTests: true,
    verbose: true,
};
