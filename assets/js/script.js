(() => {
    const btns = document.querySelector('.btns')
    const btn = document.querySelector('.btn')
    const nextBtn = document.querySelector('.next-btn')
    const confirmBtn = document.querySelector('.confirm-btn')
    const backBtn = document.querySelector('.b-btn')
    const changeBtn = document.querySelector('.change-btn')
    const forms = document.querySelectorAll('.form')
    const thx = document.querySelector('.form__thx')
    const steps = document.querySelectorAll('.step')
    const plans = {
        0: {
            name: 'Arcade',
            price: {
                monthly: 9,
                yearly: 90
            }
        },
        1: {
            name: 'Advanced',
            price: {
                monthly: 12,
                yearly: 120
            }
        },
        2: {
            name: 'Pro',
            price: {
                monthly: 15,
                yearly: 150
            }
        }
    }

    const addOns = {
        0: {
            name: 'Online service',
            price: {
                monthly: 1,
                yearly: 10
            }
        },
        1: {
            name: 'Larger storage',
            price: {
                monthly: 2,
                yearly: 20
            }
        },
        2: {
            name: 'Customizable profile',
            price: {
                monthly: 2,
                yearly: 20
            }
        }
    }

    const formData = {
        1: {}, 
        2: {},
        3: {},
        billing: 'monthly',
        total: 0
    }

    function textBillingPrice(price, billing) {
        if (billing === 'yearly') return `$${price}/yr`
        return `$${price}/mo`
    }

    function getAddOnsTotal() {
        let total = 0
        for (num of Object.keys(formData[3])) {
            total+=Number(addOns[num]['price'][formData['billing']])
        }
        return total
    }

    // FORM 1
    const inputName = document.getElementById('name')
    const inputEmail = document.getElementById('email')
    const inputPhone = document.getElementById('phone')
    const requiredTxt = document.querySelectorAll('.required.danger')

    function nameValidation() {
        if (inputName.value === "") {
            inputName.classList.add('danger')
            requiredTxt[0].classList.remove('none')
            return false
        } else {
            inputName.classList.remove('danger')
            requiredTxt[0].classList.add('none')
            return true
        }
    }

    function emailValidaton() {
        if (inputEmail.value === '') {
            inputEmail.classList.add('danger')
            requiredTxt[1].classList.remove('none')
            return false
        } else if (!inputEmail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            inputPhone.classList.add('danger')
            requiredTxt[1].textContent = "Please fill a valid email address"
            requiredTxt[1].classList.remove('none')
            return false
        } else {
            inputEmail.classList.remove('danger')
            requiredTxt[1].classList.add('none')
            return true
        }
    }

    function phoneValidaton() {
        if (inputPhone.value === '') {
            inputPhone.classList.add('danger')
            requiredTxt[2].classList.remove('none')
            return false
        } else if (!inputPhone.value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) {
            inputPhone.classList.add('danger')
            requiredTxt[2].textContent = "Please fill a valid phone number"
            requiredTxt[2].classList.remove('none')
            return false
        } else {
            inputPhone.classList.remove('danger')
            requiredTxt[2].classList.add('none')
            return true
        }
    }


    function f() {
        inputName.addEventListener('blur', nameValidation)
        inputEmail.addEventListener('blur', emailValidaton)
        inputPhone.addEventListener('blur', phoneValidaton)
    }
    f()

    // FORM 2

    const toggle = document.querySelector('.toggle')
    const trials = document.querySelectorAll('.trial')
    const planPrices = document.querySelectorAll('.plan__price')
    const addOnsPrices = document.querySelectorAll('.add-ons__price')
    const summaryAddOnsPrices = document.querySelectorAll('.summary__add-ons-price')
    const summaryTotalBilling = document.querySelector('.summary__total-billing')

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('checked')

        for (let i = 0; i < planPrices.length; i++) {
            const trial = trials[i]
            const price = planPrices[i]
            const ao = addOnsPrices[i]
            const sao = summaryAddOnsPrices[i]

            trial.classList.toggle('hidden')
            
            if (toggle.classList.contains('checked')) {
                price.textContent = textBillingPrice(plans[i]['price']['yearly'], 'yearly')
                ao.textContent = textBillingPrice(addOns[i]['price']['yearly'], 'yearly')
                sao.textContent = textBillingPrice(addOns[i]['price']['yearly'], 'yearly')
                summaryTotalBilling.textContent = 'Total (per year)'
            } else {
                price.textContent = textBillingPrice(plans[i]['price']['monthly'], 'monthly')
                ao.textContent = textBillingPrice(addOns[i]['price']['monthly'], 'monthly')
                sao.textContent = textBillingPrice(addOns[i]['price']['monthly'], 'monthly')
                summaryTotalBilling.textContent = 'Total (per month)'
            }
        }
    })

    // FORM 3
    const addOnses = document.querySelectorAll('.add-ons')

    addOnses.forEach(function(el) {
        el.addEventListener('click', function() {
            const addOnsData = this.querySelector('.left').getAttribute('data-value')
            displayColorCheckbox(this, addOnsData)
            displayCheckmark(this)
        })
    })

    function displayColorCheckbox(el, ao) {
        const cbx = el.querySelector('.checkbox')
        cbx.classList.toggle('checked')

        if (cbx.classList.contains('checked')) {
            formData[3][ao] = 1
        } else {
            delete formData[3][ao]
        }
    }

    function displayCheckmark(el) {
        const check = el.querySelector('.checkmark')
        check.classList.toggle('none')
    }

    // FORM 4 

    function getSummary() {
        const summaryPlan = document.querySelector('.summary__plan-type')
        const summaryPlanPrice = document.querySelector('.summary__plan-price')
        const summaryTotal = document.querySelector('.summary__total-price')
        const str = formData['billing']
        const billingType = str[0].toUpperCase() + str.slice(1)

        summaryPlan.textContent = `${formData[2].name} (${billingType})`
        summaryPlanPrice.textContent = textBillingPrice(formData[2].price, formData['billing']) 
        summaryTotal.textContent = textBillingPrice(formData['total'] + getAddOnsTotal(), formData['billing'])
    }

    function displayAddOns() {
        const wrapper = document.querySelectorAll('.summary__add-ons-wrapper')
        const addOns = Object.keys(formData[3])

        if (addOns.length > 0) {
            for (ao of addOns) {
                wrapper[ao].classList.remove('none')
            }
        }
    }

    nextBtn.addEventListener('click', () => {
        const currentStep = document.querySelector('.step.active')
        const planSelected = document.querySelector('input[name="plan"]:checked').value
        let step = Number(currentStep.getAttribute('data-step')) - 1

        if (step < 4 && Array(nameValidation(), emailValidaton(), phoneValidaton()).every(Boolean)) {
            backBtn.classList.remove('hidden')
            btns.classList.add('sp-bt')

            formData[1]['name'] = inputName.value
            formData[1]['email'] = inputEmail.value
            formData[1]['phone'] = inputPhone.value

            toggle.classList.contains('checked') ? formData['billing'] = 'yearly' : formData['billing'] = 'monthly'
            
            if (step === 1) {
                formData[2]['name'] = plans[planSelected]['name']
            formData[2]['price'] = plans[planSelected]['price'][formData['billing']]
            formData['total'] = Number(formData[2]['price'])
            }

            steps[step].classList.remove('active')
            steps[step + 1].classList.add('active')
            forms[step].classList.add('none')
            forms[step + 1].classList.remove('none')
            step++
        } 

        if (step === 3) {
            nextBtn.classList.add('none')
            confirmBtn.classList.remove('none')
            displayAddOns()
            getSummary()
        }

    })

    backBtn.addEventListener('click', () => {
        const currentStep = document.querySelector('.step.active')
        let step = Number(currentStep.getAttribute('data-step')) - 1


        if (step && step > 0) {
            steps[step - 1].classList.add('active')
            steps[step].classList.remove('active')
            forms[step - 1].classList.remove('none')
            forms[step].classList.add('none')
            step--
        } 
        
        if (step === 0) {
            backBtn.classList.add('hidden')
            btns.classList.remove('sp-bt')
        }

        

        if (step < 3) {
            nextBtn.classList.remove('none')
            confirmBtn.classList.add('none')
        }
    })

    confirmBtn.addEventListener('click', () => {
        formData['total'] += getAddOnsTotal()
        forms[3].classList.add('none')
        thx.classList.remove('none')
        btns.remove()
    })

    changeBtn.addEventListener('click', () => {
        forms[3].classList.add('none')
        forms[1].classList.remove('none')
        steps[3].classList.remove('active')
        steps[1].classList.add('active')

        nextBtn.classList.remove('none')
        confirmBtn.classList.add('none')
    })
})()