'use client'

import { ClientFormModal } from '@/components/clients/client-form-modal'
import { Button } from '@/components/ui/button'
import { deleteClientAction } from '@/services/clients.service'
import type { Client } from '@/types/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type ClientActionsProps = {
  client: Client
  clients: Pick<Client, 'id' | 'name'>[]
}

export function ClientActions({ client, clients }: ClientActionsProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete(formData: FormData) {
    setIsDeleting(true)

    try {
      await deleteClientAction(formData)
      dialogRef.current?.close()
      router.refresh()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='flex items-center justify-end gap-2'>
      <Link
        href={`/clients/${client.id}`}
        className='text-primary hover:bg-primary-fixed rounded px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors'
      >
        Ver
      </Link>

      <ClientFormModal
        client={client}
        clients={clients}
        trigger={
          <span className='text-primary hover:bg-primary-fixed rounded px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors'>
            Editar
          </span>
        }
      />

      <Button
        type='button'
        variant='secondary'
        className='min-h-9 px-3 text-xs uppercase tracking-widest'
        onClick={() => dialogRef.current?.showModal()}
      >
        Excluir
      </Button>

      <dialog
        ref={dialogRef}
        className='app-modal m-auto w-[min(448px,calc(100vw-32px))] rounded-lg border border-outline-variant bg-surface-container-lowest p-0 text-on-surface shadow-[0_34px_110px_oklch(24.3%_0.083_345.3_/_0.24)]'
      >
        <form action={handleDelete} className='flex flex-col items-center px-10 py-12 text-center'>
          <input type='hidden' name='id' value={client.id} />

          <div className='bg-error-container text-error flex size-16 items-center justify-center rounded-lg'>
            <span className='text-3xl leading-none' aria-hidden='true'>
              ×
            </span>
          </div>

          <h2 className='mt-8 font-serif text-xl font-semibold text-on-surface'>
            Excluir cliente
          </h2>

          <p className='mt-3 max-w-72 text-base leading-7 text-on-surface-variant'>
            Tem certeza que deseja excluir permanentemente o registro de{' '}
            <strong className='font-semibold text-on-surface'>{client.name}</strong>?
          </p>

          <div className='mt-10 flex w-full flex-col gap-5'>
            <Button type='submit' disabled={isDeleting} aria-busy={isDeleting} className='w-full'>
              {isDeleting ? (
                <span className='inline-flex items-center justify-center gap-2'>
                  <span
                    className='size-4 animate-spin rounded-full border-2 border-white/35 border-t-white'
                    aria-hidden='true'
                  />
                  Excluindo...
                </span>
              ) : (
                'Excluir'
              )}
            </Button>

            <button
              type='button'
              disabled={isDeleting}
              onClick={() => dialogRef.current?.close()}
              className='text-on-surface hover:text-primary rounded py-2 text-base transition-colors disabled:pointer-events-none disabled:opacity-60'
            >
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
