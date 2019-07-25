(function () {
    let data = [...DATA_TABLE]
    let tBody = document.querySelector('.table tbody')
    
    let orderByVal = document.querySelector('#orderBy').value
    let orderVal = document.querySelector('#order').value

    let specialStockFilter

    function buildBody () {
        let tbodyArr = []
        let orderBySort = orderByVal === 'relevance' ? 'reward' : 'closePrice'
        let minus = orderVal === 'asc' ? 1 : -1

        let dataFilter = []
        if (specialStockFilter) {
            dataFilter = data.filter(item => {
                return item.specialStock === specialStockFilter
            })
        } else {
            dataFilter = data
        }

        dataFilter.sort((a, b) => {
            return (a[orderBySort] - b[orderBySort])*minus
        })

        let content = dataFilter.forEach(item => {
            let tdStr = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.reward}</td>
                <td>${item.specialStock}</td>
                <td>${item.closePrice}</td>
            <tr/>
            `
            tbodyArr.push(tdStr)
        })
        tBody.innerHTML = tbodyArr.join('')
    }
    buildBody()

    document.querySelector('#orderBy').addEventListener('change', function (e) {
        orderByVal = e.target.value
        buildBody()
    })
    document.querySelector('#order').addEventListener('change', function (e) {
        orderVal = e.target.value
        buildBody()
    })
    document.querySelector('#specialStock').addEventListener('change', function (e) {
        specialStockFilter = e.target.checked
        buildBody()
    })
})()