## TODO

  - [ ] Sessions
    - [ ] setup bcrypt (store, compare)
    - [-] setup header compare
    - [ ] Token Model (sqls)
    - [ ] store password
    - [ ] validate Token
    - [ ] create Token
    - [ ] delete Token
  - [ ] Crud Model
    - [ ] Create
    - [ ] Read
    - [ ] Update
    - [ ] Delete


NOTES:

pick a token system
- https://www.npmjs.com/package/jwt-simple
- https://www.npmjs.com/package/co-bcrypt
define a schema:
  - userId, acl, expiresAt

.ENV Changes
SALT=10
