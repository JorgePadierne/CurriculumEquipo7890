# Imagen base para compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar csproj y restaurar
COPY *.sln .
COPY ServerHolaMundo/*.csproj ./ServerHolaMundo/
RUN dotnet restore

# Copiar el resto del código
COPY . .
WORKDIR /src/ServerHolaMundo
RUN dotnet publish -c Release -o /app/publish

# Imagen final para ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ServerHolaMundo.dll"]