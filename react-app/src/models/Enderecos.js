class Enderecos {
    constructor(cep, bairro, logradouro, numero, complemento, cidade, estado, uf, latitude, longitude) {
        this.cep = cep;
        this.bairro = bairro;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
        this.uf = uf;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Enderecos;