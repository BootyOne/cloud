# YandexCloud
# Деплой
1) подготовить профиль Яндекс.Облако
# Backend
2) подготовить авторизованный ключ https://cloud.yandex.ru/docs/iam/operations/authorized-key/create
3) создать файл "authorized_key.json" в папке /backend/cloud/ . и подставить данные ключа из шага 2
    {
  "id": "ajef3lk2jav....",
  "service_account_id": "ajev3amsvl..",
  "created_at": "2022-01-18T20:57:28.703147925Z",
  "key_algorithm": "RSA_2048",
  "public_key": "-----BEGIN PUBLIC KEY-----...",
  "private_key": "PLEASE DO NOT REMOVE THIS LINE! Yandex.Cloud SA Key ID <ajef3lk2javg30lnq0nb>\n-----BEGIN PRIVATE KEY-----..."
  }
4) указать ссылку на YDB в файле /backend/cloud/Extensions/ISCExtension.cs в 21 строке
5) создать реестр и репозиторий докер образов https://cloud.yandex.ru/ru/docs/container-registry/quickstart/?from=int-console-help-center-or-nav
6) добавить докер образ бекенда в реестр
7) создать serverless container, он будет запускаться из созданного образа
# Frontend
8) заменить BACKEND_URL в файле constants.js на 
    "https://{serverless_container_id}.containers.yandexcloud.net/api/"
9) npm run build
10) создать Object Storage и загрузить в него файлы из папки frontend/build
