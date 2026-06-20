import type { Quolle } from "./client";
import type { Contact, ContactList } from "./types";

export class ContactsResource {
  constructor(private readonly client: Quolle) {}

  async lists(): Promise<ContactList[]> {
    return this.client.request<{ lists: ContactList[] }>("GET", "/v1/contacts/lists").then((r) => r.lists);
  }

  async createList(name: string): Promise<ContactList> {
    return this.client.request("POST", "/v1/contacts/lists", { name });
  }

  async deleteList(id: string): Promise<{ message: string }> {
    return this.client.request("DELETE", `/v1/contacts/lists/${id}`);
  }

  async list(listId: string): Promise<Contact[]> {
    return this.client.request<{ contacts: Contact[] }>("GET", `/v1/contacts/${listId}`).then((r) => r.contacts);
  }

  async add(
    listId: string,
    contact: { email: string; firstName?: string; lastName?: string; phone?: string }
  ): Promise<Contact> {
    return this.client.request("POST", `/v1/contacts/${listId}`, contact);
  }

  async delete(listId: string, contactId: string): Promise<{ message: string }> {
    return this.client.request("DELETE", `/v1/contacts/${listId}/${contactId}`);
  }
}
