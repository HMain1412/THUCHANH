import express from "express"
const getAbout = (req, res) => {
    return res.render("home", { data: { title: 'about', page:"about", content: 'Đây là about' } })
}
export default getAbout