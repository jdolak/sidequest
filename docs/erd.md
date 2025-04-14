```mermaid
erDiagram
    USERS {
        int user_id PK
        string user_name
        string email
        string password_hash
    }

    GROUPS {
        int group_id PK
        string group_name
        string group_desc
        boolean group_visibility
    }

    GROUPS_USER {
        int user_id PK,FK
        int group_id PK,FK
        int currency
    }

    AVAILABLE_BETS {
        int bet_id PK
        int group_id FK
        int seller_id FK
        string question
    }

    BOUGHT_BETS {
        int buyer_id PK,FK
        int bet_id PK,FK
        int quantity
        string result
        date date_bought
        date date_resolved
    }

    QUESTS {
        int quest_id PK
        int group_id FK
        int author_id FK
        string quest_desc
        int reward_amount
        date due_date
        string quest_status
    }

    QUEST_SUBMISSIONS {
        int submission_id PK
        int user_id FK
        int quest_id FK
        string submission_photo
        datetime submission_date_time
        string status
    }

    USERS ||--o{ GROUPS_USER : "is in"
    GROUPS ||--o{ GROUPS_USER : "has"
    USERS ||--o{ AVAILABLE_BETS : "sells"
    GROUPS ||--o{ AVAILABLE_BETS : "has"
    USERS ||--o{ BOUGHT_BETS : "buys"
    AVAILABLE_BETS ||--o{ BOUGHT_BETS : "is bought in"
    GROUPS ||--o{ QUESTS : "has"
    USERS ||--o{ QUEST_SUBMISSIONS : "submits"
    QUESTS ||--o{ QUEST_SUBMISSIONS : "has"

```
