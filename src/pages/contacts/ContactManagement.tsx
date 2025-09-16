import { useState } from "react";
import { ContactList } from "@/components/contacts/ContactList";
import { ContactForm } from "@/components/contacts/ContactForm";
import { ContactDetail } from "@/components/contacts/ContactDetail";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  state: string;
  district: string;
  preferredContact: string;
  address: string;
  createdAt: string;
  lastActive: string;
};

export const ContactManagement = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  if (selectedContact) {
    return (
      <ContactDetail
        contact={selectedContact}
        onBack={() => setSelectedContact(null)}
        onEdit={() => handleEditContact(selectedContact)}
      />
    );
  }

  if (isFormOpen) {
    return (
      <ContactForm
        contact={editingContact}
        onClose={handleFormClose}
        onSave={handleFormClose}
      />
    );
  }

  return (
    <ContactList
      onAddContact={handleAddContact}
      onEditContact={handleEditContact}
      onViewContact={handleViewContact}
    />
  );
};