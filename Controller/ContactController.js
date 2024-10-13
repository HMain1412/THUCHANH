import express from "express"
const getContact= (req, res) => {
    return res.render("home", { data: { title: 'Contact', page:"Contact", content: 'Đây là Contact' } })
}
export default getContact