const sql = require('mssql');

const config = {
  user: 'sa', // ya da Windows Authentication yerine özel kullanıcı
  password: 'SeninParolan', // Eğer SQL Authentication kullanıyorsan
  server: 'ENES_KARAHAN',
  database: 'SeninVeritabaniAdi',
  options: {
    encrypt: false, // SSL hatasını önlemek için
    trustServerCertificate: true,
  },
};

module.exports = {
  sql, config
};