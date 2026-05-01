'use client'

import { ClientFormModal } from '@/components/clients/client-form-modal'
import { Button } from '@/components/ui/button'
import { deleteClientAction } from '@/services/clients.service'
import type { Client } from '@/types/client'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type ClientDetailActionsProps = {
  client: Client
  clients: Pick<Client, 'id' | 'name'>[]
}

export function ClientDetailActions({
  client,
  clients,
}: ClientDetailActionsProps) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete(formData: FormData) {
    setIsDeleting(true)

    try {
      await deleteClientAction(formData)
      dialogRef.current?.close()
      router.push('/clients')
      router.refresh()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='flex items-center gap-4'>
      <ClientFormModal
        client={client}
        clients={clients}
        trigger={
          <span className='font-body border-primary text-primary hover:bg-primary-fixed/60 inline-flex min-h-11 items-center justify-center rounded border bg-transparent px-7 text-sm font-semibold transition-all duration-200'>
            Editar
          </span>
        }
      />

      <Button
        type='button'
        onClick={() => dialogRef.current?.showModal()}
        className='min-h-11 px-7 text-sm'
      >
        Excluir
      </Button>

      <dialog
        ref={dialogRef}
        className='app-modal border-outline-variant bg-surface-container-lowest text-on-surface m-auto w-[min(448px,calc(100vw-32px))] rounded-lg border p-0 shadow-[0_34px_110px_oklch(24.3%_0.083_345.3/0.24)]'
      >
        <form
          action={handleDelete}
          className='flex flex-col items-center px-10 py-12 text-center'
        >
          <input type='hidden' name='id' value={client.id} />

          <div className='bg-error-container text-error flex size-16 items-center justify-center rounded-lg'>
            <span className='text-3xl leading-none' aria-hidden='true'>
              x
            </span>
          </div>

          <h2 className='text-on-surface mt-8 font-serif text-xl font-semibold'>
            Excluir cliente
          </h2>

          <p className='text-on-surface-variant mt-3 max-w-72 text-base leading-7'>
            Tem certeza que deseja excluir permanentemente o registro de{' '}
            <strong className='text-on-surface font-semibold'>
              {client.name}
            </strong>
            ?
          </p>

          <div className='mt-10 flex w-full flex-col gap-5'>
            <Button
              type='submit'
              disabled={isDeleting}
              aria-busy={isDeleting}
              className='w-full'
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
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
