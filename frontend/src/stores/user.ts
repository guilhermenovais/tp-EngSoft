import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usuario: (() => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "null");            return userData && typeof userData === "object" ? userData : null;
          } catch (error) {
          console.error("Erro ao carregar usuário do localStorage:", error);
          return null;
          }
        })(),
   token: localStorage.getItem("token") || null
  }),
        

  getters: {
    isLogged: (state) => !!state.usuario,
    getUserInfo: (state) => state.usuario
  },

  actions: {
    setUsuario(dados: { id: number; username: string; email: string }) {
        this.$patch({ usuario: dados });
        localStorage.setItem("user", JSON.stringify(dados));
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    limparUsuario() {
      this.usuario = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});