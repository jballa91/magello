## Users
* Patch /users => Allows auth0 to add users to the database
* GET /users/:id => Allows the access of one user's information
* GET /users/:id/boards => Allows the access of a user's created boards

## Boards
* GET /boards/:id => Allows the access of one board, containing it's lists
* POST /boards => Allows a user to create a board
* DELETE /boards/:id => Allows a user to delete one of their boards

## Lists
* GET /lists/:id => Allows the access of a list, showing it's cards
* POST /lists => Allows a user to create a list
* DELETE /lists/:id => Allows a user to delete on of their lists

## Cards
* POST /cards => Allows a user to createa a card in a list
* DELETE /cards/:id => Allows a user to delete one of their cards