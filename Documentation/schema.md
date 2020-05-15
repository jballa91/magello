# magello Schema

## Users

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| nickname       |  string   |                       |
| email          |  string   |              not null |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## Boards

| attrubute name  | data type |               details |
| --------------- | :-------: | --------------------: |
| id              |  integer  | not null, primary key |
| name            |  string   |              not null |
| backgroundColor |  string   |                       |
| userId          |  integer  |           foreign key |
| createdAt       | timestamp |              not null |
| updatedAt       | timestamp |              not null |

## Lists

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| name           |  string   |              not null |
| complete       |  boolean  |                       |
| boardId        |  integer  |           foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## Cards

| attrubute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| name           |  string   |              not null |
| complete       |  boolean  |                       |
| data           |   text    |                       |
| listId         |  integer  |           foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |
