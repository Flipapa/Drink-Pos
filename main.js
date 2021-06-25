const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
const orderLists = document.querySelector('[data-order-lists]')
const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
const alphaPos = new AlphaPos()

let allDrinksOptions = document.querySelectorAll('input[name="drink"]')


// Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice

  Drink.prototype.price = function () {
    switch (this.name) {
      case 'Black Tea':
      case 'Oolong Tea':
      case 'Baozong Tea':
      case 'Green Tea':
        return 30
      case 'Bubble Milk Tea':
      case 'Lemon Green Tea':
        return 50
      case 'Black Tea Latte':
      case 'Matcha Latte':
        return 55
      default:
        alert('No this drink')
    }
  }
}
// AlphaPos Constructor Function
function AlphaPos() {
  AlphaPos.prototype.getCheckedValue = function (inputName) {
    let selectedOption = ''

    document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
      if (item.checked) {
        selectedOption = item.value
      }
    })
    return selectedOption
  }
  AlphaPos.prototype.addDrink = function (drink) {
    if (orderLists.firstElementChild.classList.contains('empty')) {
      orderLists.firstElementChild.remove()
    }
    let orderListsCard = `
      <div class="card mb-3">
        <div class="card-body pt-3 pr-3">
          <div class="text-right">
            <span data-alpha-pos="delete-drink">×</span>
          </div>
          <h6 class="card-title mb-1">${drink.name}</h6>
          <div class="card-text">${drink.ice}</div>
          <div class="card-text">${drink.sugar}</div>
        </div>

        <div class="card-footer text-right py-2">
          <div class="card-text text-muted">
            $<span data-drink-price>${drink.price()}</span>
          </div>
        </div>
      `
    orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
  }
  AlphaPos.prototype.deleteDrink = function (target) {
    target.remove()
  }
  AlphaPos.prototype.checkout = function () {
    let totalAmount = 0
    document.querySelectorAll('[data-drink-price]').forEach(function(drink) {
      totalAmount += Number(drink.textContent)
    })
    return totalAmount
  }
  AlphaPos.prototype.clearOrder = function (target) {
    target.querySelectorAll('.card').forEach(card => {
      card.remove()
    })
    let emptyText = `
      <div class="empty text-center text-secondary">
        <h3>No Item</h3>
      </div>
    `
    orderLists.insertAdjacentHTML('afterbegin', emptyText)
  }
}

// Add Drinks
addDrinkButton.addEventListener('click', function () {
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')

  // 沒選擇品項，跳出提示
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  // 建立飲料實例，並取得價格
  const drink = new Drink(drinkName, sugar, ice)

  // 建立點單
  alphaPos.addDrink(drink)
})

// Edit Drink List
orderLists.addEventListener('click', event => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]')
  if (!isDeleteButton) {
    return
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement)
})

// Checkout
checkoutButton.addEventListener('click', function() {
  // 結算
  alert(`Total amount of drinks: $${alphaPos.checkout()}`)
  // 清空清單
  alphaPos.clearOrder(orderLists)
})