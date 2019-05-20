cd src
dotnet publish ./AltenCode.Api -c Release -o ./bin/Docker
dotnet publish ./AltenCode.Services.Vehicles -c Release -o ./bin/Docker
