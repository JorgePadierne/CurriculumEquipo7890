# Imagen base para compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar csproj y restaurar
COPY Lista_Tareas/*.csproj ./Lista_Tareas/
RUN dotnet restore Lista_Tareas/Lista_Tareas.csproj

# Copiar el resto del código
COPY . .
RUN dotnet publish Lista_Tareas/Lista_Tareas.csproj -c Release -o /app/publish

# Imagen final para ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Lista_Tareas.dll"]

