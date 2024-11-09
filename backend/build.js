import * as esbuild from "esbuild";
import serve from "@es-exec/esbuild-plugin-serve";
import graphqlLoaderPlugin from "@luckycatfactory/esbuild-graphql-loader";

console.log(Object.keys(graphqlLoaderPlugin));

const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  outfile: "dist/out.js",

  // @ts-ignore
  plugins: [graphqlLoaderPlugin.default()],
};

if (process.argv.includes("--dev")) {
  options.plugins.push(serve());
  // @ts-ignore
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  // @ts-ignore
  await esbuild.build(options);
}
