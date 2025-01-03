struct Item {
    user: String,
    name: String,
    description: String,
    prepare_time: u32, // hora
    price: u32, // money
    category: String,
    created_at: String,
    updated_at: String,
}

struct ItemCDTO {
    name: string,
    description: string,
    prepareTime: number,
    price: number,
    category: string,
}



struct ItemC {
    item: ItemCDTO,
    payload: Payload,
};

struct ItemU {
    name: string,
    description: string,
    prepareTime: number,
    price: number,
};

struct Payload {
    id: string;
    name: string;
};



fn item_c() {
}




async deleteItem(id: string) {
    return await this.itemModel.findByIdAndDelete(id);
}

async getItem(id: string) {
    return await this.itemModel.findById(id);
}

async updateItem(id: string, itemToUpdate: updateItemType) {
    return await this.itemModel.findByIdAndUpdate(
        id,
        itemToUpdate,
    );
}