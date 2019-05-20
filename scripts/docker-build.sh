cd src
docker build -f ./AltenCode.Api/Dockerfile -t altencode.api ./AltenCode.Api
docker build -f ./AltenCode.Services.Vehicles/Dockerfile -t altencode.services.vehicles ./AltenCode.Services.Vehicles
