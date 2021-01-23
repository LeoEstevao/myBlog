## Analyze multiples Categories in navbar 
>put results limit, and "all categories" (if has too many of then)

## Responsive Layout
>Create tablet and mobile layout

## REMOVE COMMENTS
>Remove non-required coments
>Make a pattern of comments

## Limit/Pagination Categories and Articles 
>Pagination Articles/Categories views (admin)
>Pagination Articles filtered by Categories (users)

## Fix navbar OR CREATE A SIDEBAR FOR USERS NAVIGATION, AND NAVBAR MOSTLY FOR ADMIN NAVIGATION?
>Change Links Redirections (login/logout, others).
>Create two navbar, for users and admin
>Fix navbars refs. There are two navbars, for users and for admin, and they are differents and don't reference each other? (PUT A LOGIN/LOGOUT LINK ON USERS NAVBAR?)
>Fix users navbar for limits of categories (and characters?)

## DATABASE Fixes
>Change the plural to singular on BD, because sequelize automatically messed up everything
    https://stackoverflow.com/questions/49459596/how-do-plurals-work-in-sequelize/49459597

>Create nulls fields to create EVERYTHING in database and in EJS.
>Limit chars fields (Like Categories, login, email)
>Check if an e-mail is valid?

## PATTERNS
>Padronizar referencias do controler e dos ejs dos articles (alguns estao como articId, outros articleId)

## CSS/LAYOUT FIXES
>Atualizar layout das listas do admin (na parte dos botoes alterar/deletar)


# MIDDLEWARES
>Check why the fuckk the middleware in routes users/create don't work
>Check Why the fuck the logout route can't be in the end of the file
https://www.google.com/search?q=Error+%5BERR_HTTP_HEADERS_SENT%5D%3A+Cannot+set+headers+after+they+are+sent+to+the+client&oq=Error+%5BERR_HTTP_HEADERS_SENT%5D%3A+Cannot+set+headers+after+they+are+sent+to+the+client&aqs=chrome..69i57.387j0j7&sourceid=chrome&ie=UTF-8

## IMPROVEMENT
>Make a logic, to when you be redirect to login page, instead, you just render the login page, and after that you will be redirected to the page you wanted to access before