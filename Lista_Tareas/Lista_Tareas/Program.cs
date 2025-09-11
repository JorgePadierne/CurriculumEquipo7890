using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------------
<<<<<<< HEAD
// 1️⃣ Leer DATABASE_URL (Neon / Render)
=======
// 1️⃣ Leer DATABASE_URL (Internal URL en Render)
>>>>>>> c9ff0ef46ec7e6811e21456197d5923846dc27f5
// ----------------------------------------------------
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
<<<<<<< HEAD
    // Normalizar prefijo postgres:// → postgresql://
    if (databaseUrl.StartsWith("postgres://"))
    {
        databaseUrl = databaseUrl.Replace("postgres://", "postgresql://");
    }

    var databaseUri = new Uri(databaseUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    // Si no trae puerto → usar 5432 por defecto
    int port = databaseUri.Port != -1 ? databaseUri.Port : 5432;

    var npgsqlBuilder = new NpgsqlConnectionStringBuilder
    {
        Host = databaseUri.Host,
        Port = port,
        Username = userInfo[0],
        Password = userInfo.Length > 1 ? userInfo[1] : "",
=======
    // Convertir la URL de Render al formato Npgsql
    var databaseUri = new Uri(databaseUrl);
    var userInfo = databaseUri.UserInfo.Split(':');

    var npgsqlBuilder = new NpgsqlConnectionStringBuilder
    {
        Host = databaseUri.Host,
        Port = databaseUri.Port,
        Username = userInfo[0],
        Password = userInfo[1],
>>>>>>> c9ff0ef46ec7e6811e21456197d5923846dc27f5
        Database = databaseUri.AbsolutePath.TrimStart('/'),
        SslMode = SslMode.Require,
        TrustServerCertificate = true
    };

    connectionString = npgsqlBuilder.ConnectionString;
}
else
{
<<<<<<< HEAD
    // Fallback a la cadena local
=======
    // Si no hay variable de entorno, usar la cadena local de appsettings.json
>>>>>>> c9ff0ef46ec7e6811e21456197d5923846dc27f5
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// ----------------------------------------------------
// 2️⃣ Configurar DbContext
// ----------------------------------------------------
builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString));

// ----------------------------------------------------
// 3️⃣ Configurar servicios y CORS
// ----------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirReact",
        policy =>
        {
            policy.WithOrigins("https://curriculum-equipo7890.vercel.app")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddOpenApi();

var app = builder.Build();

// ----------------------------------------------------
// 4️⃣ Middleware
// ----------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();

