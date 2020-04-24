export class NotesModel {

    constructor(public title: String, public content: String,
                public length: Number, public date: Date, 
                public userId: String, public _id?: string) {}

}