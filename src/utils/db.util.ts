import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import i18n from '@/i18n';

const adapter = new LocalStorage('index');
const db = low(adapter);

db
    .defaults({
        locale: i18n.global.locale
    })
    .write();

export default db;
