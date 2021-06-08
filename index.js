async function onSubmit(params) {
  try {
    const questionsData = await getData()
    const questions = Object.keys(questionsData)
    const answers = {}
    const userSlected = {}
    questions.forEach((question) => {
      const options = document.getElementsByName(question)
      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          userSlected[question] = options[i].value
        }
      }
    })
    Object.entries(questionsData).forEach(([key, value]) => {
      answers[key] = value.ans
    })
    let count = 0
    Object.entries(userSlected).forEach(([key, value]) => {
      if (value === answers[key]) count++
    })
    document.getElementById("result").innerHTML = `You scored ${count} / ${questions.length}`
  } catch (error) {}
}

async function getQuestions() {
  try {
    const questionsData = await getData()
    let questions = ""
    Object.entries(questionsData).forEach(([key, value]) => {
      questions += `
      <div id=${value.id}>
        <p>${value.question}</p><br>
        <input type="radio" name=${key} value="0">${value[0]}</input><br>
        <input type="radio" name=${key} value="1">${value[1]}</input><br>
        <input type="radio" name=${key} value="2">${value[2]}</input><br>
        <input type="radio" name=${key} value="3">${value[3]}</input>
      </div>
      `
    })
    document.getElementById("main").innerHTML = questions
  } catch (error) {
    document.getElementById("main").innerHTML = "Failed to load questions"
  }
}

async function getData() {
  return fetch("./questions.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err))
}
