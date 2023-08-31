import axios from "../axios-server";

//users
export const userLogin = (data) => {
    return axios.get("/users?email=" + data.email + "&password=" + data.password);
}

export const userRegister = (data) => {
    return axios.post("/users",data);
}

export const setLoggedUser = (user) => {
    return axios.post('/loggedUser',user);
}

export const getLoggedUser = () => {
    return axios.get('/loggedUser');
}

// categories
export const getCategory = (catId) => {
    return axios.get("/categories/" + catId+ "?_embed=transactions");
}

export const getIncomeCategories = (userId) => {
    return axios.get("/categories?type=INCOME&userId=" + userId);
}

export const getExpenseCategories = (userId) => {
    return axios.get("/categories?type=EXPENSE&userId=" + userId);
}

export const addIncomeCategories = (userId, categoryName) => {
    const cat = {
        "userId": userId,
        "name": categoryName,
        "type": "INCOME"
    }
    return axios.post("/categories",cat);
}

export const addExpenseCategories = (userId, categoryName) => {
    const cat = {
        "userId": userId,
        "name": categoryName,
        "type": "EXPENSE"
    }
    return axios.post("/categories",cat);
}

export const deleteCategory = (catId) => {
    return axios.delete("/categories/" + catId);
}

//accounts
export const getUserAccounts= (userId) => {
    return axios.get("/accounts?userId="+userId);
}

export const getAccount = (accId) => {
    return axios.get("/accounts/"+accId+"?_embed=transactions");
}

export const createUserAccount= (userId, accountName,initAmmount) => {
    const acc = {
        "userId": userId,
        "name": accountName,
        "initAmmount": initAmmount,
        "balance": initAmmount
    }
    return axios.post("/accounts",acc);
}

export const updateUserAccount= (account) => {
    const acc = {
        "userId": account.userId,
        "name": account.name,
        "initAmmount": account.initAmmount,
        "balance": account.balance
    }
    return axios.put("/accounts/"+account.id,acc);
}

export const deleteUserAccount =(accId) =>{
    return axios.delete("/accounts/" + accId);
}

//budgets
export const getUserBudgetsMonthWise= (userId,month,year) => {
    return axios.get("budgets?userId="+userId+"&dateTime_like="+month+"\\s\\d{2}\\s"+year+"&_expand=category");
}

export const createUserBudget = (userId, categoryId, limit, date) => {
    const budget = {
        "userId": userId,
        "categoryId": categoryId,
        "limit": limit,
        "dateTime": date
      }
      
    return axios.post("/budgets",budget);
}

export const getBudget = (budgetId) => {
    return axios.get("/budgets/"+budgetId+"?_expand=category");
}

//for budget transactions
export const getUserTransactionsCategoryAndMonthWise= (userId,catId,month,year) => {
    return axios.get("/transactions?userId="+userId+"&categoryId="+catId+"&dateTime_like="+month+"\\s\\d{2}\\s"+year+"&_expand=category&_expand=account&_sort=dateTime&_order=desc");
}

//transactions
export const addUserTransaction = (userId, type, price, comment, date, catId, accId, toAccId) => {
    let transaction;
    if(type === "TRANSFER"){
    transaction = {
            "userId": userId,
            "type": type,
            "price": price,
            "comment": comment,
            "categoryId": catId,
            "accountId": accId,
            "accountId_to": toAccId,
            "dateTime": date
          }
    } else {
    transaction = {
        "userId": userId,
        "type": type,
        "price": price,
        "comment": comment,
        "categoryId": catId,
        "accountId": accId,
        "dateTime": date
      }
    }
    return axios.post("/transactions",transaction);
}

export const deleteTransaction =(trxId) =>{
    return axios.delete("/transactions/" + trxId);
}

export const updateUserTransaction= (transaction) => {
    return axios.put("/transactions/"+transaction.id,transaction);
}

export const getUserTransactionsMonthWise= (userId,month,year) => {
    return axios.get("/transactions?userId="+userId+"&dateTime_like="+month+"\\s\\d{2}\\s"+year+"&_expand=category&_expand=account&_sort=dateTime&_order=desc");
}




