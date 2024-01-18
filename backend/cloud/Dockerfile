FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
RUN apt-get update \
&& apt-get install -y --no-install-recommends libgdiplus libc6-dev \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists /var/cache/apt/archives
WORKDIR /app

COPY cloud.csproj ./
RUN dotnet restore cloud.csproj    

COPY . .
RUN dotnet build cloud.csproj -c Release -o out
RUN dotnet publish -c Release -f net6.0 -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=build-env /app/Properties/launchSettings.json ./Properties/launchSettings.json
COPY --from=build-env /app/.version ./.version

RUN apt-get update
RUN apt-get install -y libc6-dev

ENTRYPOINT ["dotnet", "cloud.dll", "--urls", "http://0.0.0.0:8080"]