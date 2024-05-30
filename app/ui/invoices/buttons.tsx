'use client';

import { deleteInvoice } from '@/app/lib/actions';
import {
  CogIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

function DeleteButton() {
  // This pending exists only if the component is inside a <form />
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx('className="rounded-md hover:bg-gray-100" border p-2', {
        'bg-gray-300': pending,
      })}
      disabled={pending}
    >
      {pending ? <CogIcon className="w-5" /> : <TrashIcon className="w-5" />}
    </button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  // Thats why this pending is never changing, because its not inside a form
  const { pending } = useFormStatus();

  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <DeleteButton />
    </form>
  );
}
