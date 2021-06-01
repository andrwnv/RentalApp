<template>
  <div class = 'box'>
    <form>
      <label class = 'form__label'>E-mail или Номер телефона</label>
      <input type = 'email'>

      <label class = 'form__label'>Пароль</label>
      <input type = 'password'>

      <button>Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent'
}
</script>

<style scoped>
.box {
  /* Center item */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;

  height: 25em;
  width: 25%;

  background: #FAFAFA;
  box-shadow: 0 4px 27px -2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
}

.box > form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form__label {
  margin-right: auto;
  font-style: normal;
  font-weight: bold;
}

.box > form > input {
  -webkit-appearance: none;
  outline: none;
  border: none;

  width: 100%;
  height: 3em;
  margin-bottom: 10px;

  background: linear-gradient(270deg, rgba(255, 255, 255, 0.49) -0.87%, rgba(255, 255, 255, 0) 118.91%), #E7E9F7;
  border-radius: 4px;
}

.box > form > button {
  outline: none;
  border: none;

  background: #004E9A;
  border-radius: 4px;
  width: 80%;
  height: 3em;

  font-style: normal;
  font-weight: 600;
  color: #FAFAFA;
  font-size: 18px;
}

@media only screen and (max-width: 800px) {
  .box {
    width: 50%;
  }
}

@media only screen and (max-width: 600px) {
  .box {
    width: 90%;
  }
}
</style>
