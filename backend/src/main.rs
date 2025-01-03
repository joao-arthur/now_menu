mod item;
mod menu;
mod restaurant;

fn main() {
    println!("Hello, world!");
}

//entidades

struct Category {
    id: String,
    name: String
}

struct Table {
    user: String,
    name: String,
    created_at: String,
    updated_at: String,
}



struct OrderItem {
    item: String,
    amount: u8, 
}

struct Order {
    table_id: String,
    table_name: String,
    user: String,
    name: String,
    customer: String,
    items: Vec<OrderItem>,
    active: bool,
    created_at: String,
    updated_at: String,
}
//entidades


// item
