//Getting and setting values
const formFields = {
  type : document.getElementById("choise_of_type"),
  duration : document.getElementById("time"),
  extra : document.getElementById("choice"),
  quantity : document.getElementById("people"),
}
const currentOrderField = {
  type : document.getElementById("cu-choise_of_type"),
  duration : document.getElementById("cu-time"),
  extra : document.getElementById("cu-choice"),
  quantity : document.getElementById("cu-people"),
}
const currentOrderCost = document.getElementById("current-bill")

//The ticket type part
const TICKET_TYPES = {
  local : 2500,
  foreign : 5000,
  foreign_child : 2500,
  child_15 : 1000,
  child_6 : 500,
}

//The extra option part
const EXTRA_OPTIONS = {
  Annual_Pass : 5000,
  Food_Token : 500
}

//Getting the values
const getFormData = () => {
  const type = formFields.type.value
  const quantity = formFields.quantity.value
  const duration = formFields.duration.value
  const extra = formFields.extra.value

  return { type, quantity, duration, extra }
}

const setCurrentPrice = () => {
  const price = calculatePrice(getFormData())
  currentOrderCost.innerText = price || "\n"
}

formFields.type.addEventListener("change", event => {
  const options = event.target.options
  const selectedOption = options[options.selectedIndex]
  const optionText = selectedOption.innerText

  currentOrderField.type.innerText = ("Ticket type: " + optionText)
  setCurrentPrice()
})

formFields.quantity.addEventListener("mainkey", event => {
  currentOrderField.quantity.innerText = ("Quantity: " + event.target.value) || '\n'
  setCurrentPrice()
})

formFields.duration.addEventListener("change", event => {
  currentOrderField.duration.innerText = ("Duration: " + event.target.value) || '\n'
  setCurrentPrice()
})

formFields.extra.addEventListener("change", event => {
  currentOrderField.extra.innerText = ("Extras: " + event.target.value) || '\n'
  setCurrentPrice()
})
 
//The setting values part
const form = document.getElementById("order-form")
const overallOrderField = document.getElementById("full-bill")
const overallOrderCost = document.getElementById("full-bill-money")

const overallOrder = []

const calculateTotalPrice = () => {
  return overallOrder.reduce((acc, curr) => acc + calculatePrice(curr), 0)
}

//The submit part
form.addEventListener("submit", event => {
  event.preventDefault()

  const formData = getFormData()
  overallOrder.push(formData)

  const order = document.createElement('li')
  Object.values(formData).forEach(value => {
    const p = document.createElement('p')
    p.innerText = value
    order.appendChild(p)
  })
  overallOrderField.append(order)
  overallOrderCost.innerText = calculateTotalPrice()

  currentOrderField.type.innerText = ""
  currentOrderField.quantity.innerText = ""
  currentOrderField.duration.innerText = ""
  currentOrderField.extra.innerText = ""

  formFields.type.value= ""
  formFields.quantity.value= ""
  formFields.duration.value= ""
  formFields.extra.value= ""
})

const btnPlaceOrder = document.getElementById("place-order")

//The palce order part
btnPlaceOrder.addEventListener("click", () => {
  alert("Thank you For Your Order!! Your Order Is Succsessfull!!")

  currentOrderField.type.innerText = ""
  currentOrderField.quantity.innerText = ""
  currentOrderField.duration.innerText = ""
  currentOrderField.extra.innerText = ""

  formFields.type.value= ""
  formFields.quantity.value= ""
  formFields.duration.value= ""
  formFields.extra.value= ""

  overallOrderCost.innerText= ""
  overallOrderField.innerText= ""
  currentOrderCost.innerText= ""
})

const calculatePrice = formData => {
  const {type, quantity, extra, duration} = formData
  return ((TICKET_TYPES[type] * quantity) + EXTRA_OPTIONS[extra] + durationConditions(type, duration))
}


//The calculation part
const durationConditions = (ticketTypes, durations) => {

  if (ticketTypes === "local" && durations === "hours-3") {
    return 0
  } 
  else if (ticketTypes === "local" && durations === "hours-12") {
    return 125
  }
  else if ((ticketTypes === "foreign" && durations === "hours-24") || (ticketTypes === "foreign_child" && durations === "hours-24")) {
    return 1000
  }
  else if ((ticketTypes === "foreign" && durations === "hours-3") || (ticketTypes === "foreign_child" && durations === "hours-3")) {
    return 1000
  }
  else if (ticketTypes === "local" && durations === "hours-24") {
    return 250
  }
  else if ((ticketTypes === "foreign" && durations === "hours-12") || (ticketTypes === "foreign_child" && durations === "hours-12")) {
    return 500
  }
  else if (ticketTypes === "chil_15" && durations === "hours-3") {
    return 0
  }
  else if (ticketTypes === "chil_15" && durations === "hours-12") {
    return 125
  }
  else if (ticketTypes === "chil_15" && durations === "hours-24") {
    return 250
  }
  else if (ticketTypes === "chil_15" && durations === "hours-48") {
    return 1000
  }
  else if (ticketTypes === "child_6" && durations === "hours-3") {
    return 0
  }
  else if (ticketTypes === "child_6" && durations === "hours-12") {
    return 125
  }
  else if (ticketTypes === "child_6" && durations === "hours-24") {
    return 250
  }
  else if (ticketTypes === "child_6" && durations === "hours-48") {
    return 500
  }
}