# Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    users ||--o{ transactions : "creates"
    budgets ||--o{ transactions : "allocates"
    categories ||--o{ transactions : "classifies"

    users {
        int id PK
        varchar name
        varchar email UK
        varchar password_hash
        enum role
        datetime created_at
        datetime updated_at
    }

    budgets {
        int id PK
        varchar name
        text description
        decimal planned_amount
        date start_date
        date end_date
        tinyint is_active
        datetime created_at
        datetime updated_at
    }

    categories {
        int id PK
        varchar name
        enum type
        text description
        tinyint is_active
        datetime created_at
        datetime updated_at
    }

    transactions {
        int id PK
        int budget_id FK
        int category_id FK
        int created_by FK
        enum trx_type
        decimal amount
        date trx_date
        text note
        enum payment_method
        json meta
        datetime created_at
        datetime updated_at
    }
```

## Relasi Utama
- **users → transactions**: satu user dapat membuat banyak transaksi (opsional, karena transaksi bisa dibuat sistem).
- **budgets → transactions**: setiap transaksi wajib dikaitkan dengan satu budget aktif.
- **categories → transactions**: kategori menentukan tipe transaksi (income/expense/both).

Gunakan diagram ini saat menyusun dokumentasi atau laporan akhir; cukup salin blok Mermaid ke Doc/Notion/VS Code yang mendukung render Mermaid untuk menampilkan diagram visual.
