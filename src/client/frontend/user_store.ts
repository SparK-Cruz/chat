const defaultName = 'Anon';
const defaultSecret = (10000 + Math.round(Math.random() * 89999)).toFixed(0);

export default {
    data: {
        name: <string>null,
        defaultName: defaultName,
        secret: <string>null,
        defaultSecret: defaultSecret,
    },
    load() {
        this.data.name = localStorage.getItem('name') || "";
        this.data.secret = localStorage.getItem('secret') || "";
    },
    dump() {
        return {
            name: this.data.name || this.data.defaultName,
            uid: this.data.secret || this.data.defaultSecret,
        };
    },
    save() {
        localStorage.setItem('name', this.data.name || "");
        localStorage.setItem('secret', this.data.secret || this.data.defaultSecret);
    },
};
