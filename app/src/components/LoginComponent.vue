<template>
  <div class = 'box'>
    <h2>Добро пожаловать</h2>
    <form>
      <label class = 'form__label'>E-mail или Номер телефона</label>
      <input type = 'email'>

      <label class = 'form__label'>Пароль</label>
      <input type = 'password'>

      <button>Войти</button>
    </form>

    <div class = 'line' />

    <p class = 'mini_text'>Вы ешё не с нами?</p>
    <button class = 'reg_button'>Зарегистрироваться</button>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent'
}
</script>

<style scoped>
.mini_text {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  text-align: center;
  letter-spacing: -0.02em;
}

h2 {
  margin-top: 45px;
  margin-bottom: 36px;
}

.box {
  /* Center item */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;

  /*height: 25em;*/
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
  width: 85%;
}

.form__label {
  margin-right: auto;
  font-style: normal;
  font-weight: bold;
  padding-bottom: 0.7em;
}

.box > form > input {
  -webkit-appearance: none;
  outline: none;
  border: none;

  width: 95%;
  height: 3.5em;
  margin-bottom: 30px;
  padding-left: 20px;

  background: linear-gradient(270deg, rgba(255, 255, 255, 0.49) -0.87%, rgba(255, 255, 255, 0) 118.91%), #E7E9F7;
  border-radius: 4px;

  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
}

.box > form > button {
  outline: none;
  border: none;

  background: #004E9A;
  border-radius: 4px;
  width: 80%;
  height: 3em;
  margin-top: 15px;

  font-style: normal;
  font-weight: 600;
  color: #FAFAFA;
  font-size: 18px;
}

.line {
  border: 1px solid #041B2D;
  width: 50%;
  margin-top: 15px;
  margin-bottom: 30px;
}

.reg_button {
  outline: none;
  border: none;

  background: #041B2D;
  border-radius: 4px;
  width: 69%;
  height: 3em;
  margin-bottom: 50px;

  font-style: normal;
  font-weight: 600;
  color: #FAFAFA;
  font-size: 18px;
}

@media screen and (max-width: 1280px) {
  .box {
    width: 35%;
  }
}

@media screen and (max-width: 1024px) {
  .box {
    width: 45%;
  }
}

@media screen and (max-width: 768px) {
  .box {
    width: 50%;
  }
}

@media screen and (max-width: 480px) {
  .box {
    width: 90%;
  }
}

</style>
