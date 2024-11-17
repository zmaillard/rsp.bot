FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /tmp/dev
COPY package.json bun.lockb /tmp/dev/
RUN cd /tmp/dev && bun install --frozen-lockfile

RUN mkdir -p /tmp/prod
COPY package.json bun.lockb /tmp/prod/
RUN cd /tmp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

#ENV NODE_ENV=production
#RUN bun test
#RUN bun build

FROM base as release
COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=prerelease 


