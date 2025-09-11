using Lista_Tareas.Context;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// 1️⃣ Construir cadena de conexión
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    // Cambiar prefijo 'postgresql://' a 'postgres://'
    if (databaseUrl.StartsWith("postgresql://"))
        databaseUrl = "postgres://" + databaseUrl.Substring("postgresql://".Length);

    var npgsqlBuilder = new NpgsqlConnectionStringBuilder(databaseUrl)
    {
        TrustServerCertificate = true
    };

    connectionString = npgsqlBuilder.ConnectionString;
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
}

// 2️⃣ Registrar DbContext
builder.Services.AddDbContext<ToDoListContext>(options =>
    options.UseNpgsql(connectionString));

// 3️⃣ CORS
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

// 4️⃣ Middlewares
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("PermitirReact");
app.UseAuthorization();
app.MapControllers();
app.Run();


