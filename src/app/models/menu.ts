export interface Menu {
    menuID: String,
    title: String,
    tooltip?: string,
    url: String,
    isActive: boolean,
    createdAt: Date,
    lastUpdatedAt: Date,
    lastUpdatedBy: String
}