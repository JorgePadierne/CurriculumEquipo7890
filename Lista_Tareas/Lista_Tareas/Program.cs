using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------------------------------
// 1️⃣ Construir la cadena de conexión
// ----------------------------------------------------
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    // Npgsql soporta URLs con parámetros (?sslmode=require)
    var npgsqlBuilder = new NpgsqlConnectionStringBuilder(databaseUrl)
    {
        // Asegura que confíe en el certificado (en Neon/Render es necesario)
        TrustServerCertificate = true
    };

    connectionString = npgsqlBuilder.ConnectionString;
}
else
{
    // Fallback local (appsettings.json → DefaultConnection)
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// ----------------------------------------------------
// 2️⃣ Registrar DbContext
// ----------------------------------------------------
builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString));

// ----------------------------------------------------
// 3️⃣ Configurar servicios y CORS
// ----------------------------------------------------
builder.Services.AddControllers();

// CORS: cambia la URL por la de tu front en Vercel
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

// Si usas Swagger/OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

// ----------------------------------------------------
// 4️⃣ Middlewares
// ----------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();

app.Run();


