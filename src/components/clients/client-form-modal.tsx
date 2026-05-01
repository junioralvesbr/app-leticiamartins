'use client'

import { Button } from '@/components/ui/button'
import { ButtonSpinner } from '@/components/ui/button-spinner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  createClientAction,
  updateClientAction,
} from '@/services/clients.service'
import {
  clientOrigins,
  type Client,
  type ClientFormState,
  type ClientOrigin,
} from '@/types/client'
import { X } from 'lucide-react'
import { useActionState, useEffect, useRef, useState } from 'react'

type ClientFormModalProps = {
  client?: Client
  clients: Pick<Client, 'id' | 'name'>[]
  trigger: React.ReactNode
}

const initialState: ClientFormState = {}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return <p className='text-error mt-1 text-xs font-medium'>{message}</p>
}

export function ClientFormModal({
  client,
  clients,
  trigger,
}: ClientFormModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [state, formAction, pending] = useActionState(
    client ? updateClientAction : createClientAction,
    initialState
  )
  const [selectedOrigin, setSelectedOrigin] = useState(
    client?.origin ?? 'Instagram'
  )
  const title = client ? 'Editar cliente' : 'Cadastrar cliente'
  const values = state.values
  const formFieldsKey = values ? JSON.stringify(values) : (client?.id ?? 'new')

  useEffect(() => {
    if (state.ok) {
      dialogRef.current?.close()
    }
  }, [state.ok])

  return (
    <>
      <button
        type='button'
        className='contents cursor-pointer'
        onClick={() => dialogRef.current?.showModal()}
      >
        {trigger}
      </button>

      <dialog
        ref={dialogRef}
        className='app-modal border-outline-variant bg-surface-container-lowest text-on-surface m-auto w-[min(920px,calc(100vw-32px))] rounded-lg border p-0 shadow-[0_34px_110px_oklch(24.3%_0.083_345.3/0.24)]'
      >
        <form action={formAction} className='flex max-h-[88vh] flex-col'>
          <div className='border-outline-variant flex items-start justify-between gap-4 border-b px-6 py-5'>
            <div>
              <p className='text-secondary text-xs font-bold tracking-widest uppercase'>
                Clientes
              </p>
              <h2 className='text-primary font-serif text-2xl font-semibold'>
                {title}
              </h2>
            </div>
            <button
              type='button'
              className='text-outline hover:text-primary cursor-pointer rounded p-2 transition-colors'
              onClick={() => dialogRef.current?.close()}
              aria-label='Fechar modal'
            >
              <X className='size-5' aria-hidden='true' />
            </button>
          </div>

          <div
            key={formFieldsKey}
            className='grid gap-5 overflow-y-auto px-6 py-6 md:grid-cols-2'
          >
            {client ? (
              <input type='hidden' name='id' value={client.id} />
            ) : null}

            <div>
              <Label htmlFor='name'>Nome</Label>
              <Input
                id='name'
                name='name'
                defaultValue={values?.name ?? client?.name}
                required
              />
              <FieldError message={state.errors?.name} />
            </div>

            <div>
              <Label htmlFor='profession'>Profissão</Label>
              <Input
                id='profession'
                name='profession'
                defaultValue={values?.profession ?? client?.profession ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                defaultValue={values?.email ?? client?.email ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='phone'>Telefone</Label>
              <Input
                id='phone'
                name='phone'
                defaultValue={values?.phone ?? client?.phone ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='city'>Cidade</Label>
              <Input
                id='city'
                name='city'
                defaultValue={values?.city ?? client?.city ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='cpf'>CPF</Label>
              <Input
                id='cpf'
                name='cpf'
                defaultValue={values?.cpf ?? client?.cpf ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='birth_date'>Nascimento</Label>
              <Input
                id='birth_date'
                name='birth_date'
                type='date'
                defaultValue={values?.birth_date ?? client?.birth_date ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='spouse'>Cônjuge</Label>
              <Input
                id='spouse'
                name='spouse'
                defaultValue={values?.spouse ?? client?.spouse ?? ''}
              />
            </div>

            <div className='md:col-span-2'>
              <Label htmlFor='address'>Endereço</Label>
              <Input
                id='address'
                name='address'
                defaultValue={values?.address ?? client?.address ?? ''}
              />
            </div>

            <div>
              <Label htmlFor='origin'>Origem</Label>
              <select
                id='origin'
                name='origin'
                value={selectedOrigin}
                onChange={(event) =>
                  setSelectedOrigin(event.target.value as ClientOrigin)
                }
                className='border-outline-variant bg-surface-container-low/60 font-body text-on-surface focus:border-secondary focus:ring-secondary/15 w-full cursor-pointer rounded border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2'
              >
                {clientOrigins.map((origin) => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
              <FieldError message={state.errors?.origin} />
            </div>

            <div>
              <Label htmlFor='referrer_id'>Cliente indicador</Label>
              <select
                id='referrer_id'
                name='referrer_id'
                defaultValue={values?.referrer_id ?? client?.referrer_id ?? ''}
                disabled={selectedOrigin !== 'Indicação'}
                className='border-outline-variant bg-surface-container-low/60 font-body text-on-surface focus:border-secondary focus:ring-secondary/15 disabled:text-outline w-full cursor-pointer rounded border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70'
              >
                <option value=''>Selecione</option>
                {clients
                  .filter((item) => item.id !== client?.id)
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <FieldError message={state.errors?.referrer_id} />
            </div>

            <div className='md:col-span-2'>
              <Label htmlFor='notes'>Observações</Label>
              <textarea
                id='notes'
                name='notes'
                defaultValue={values?.notes ?? client?.notes ?? ''}
                rows={4}
                className='border-outline-variant bg-surface-container-low/60 font-body text-on-surface placeholder:text-outline focus:border-secondary focus:ring-secondary/15 w-full resize-none rounded border px-4 py-3 text-sm transition-all duration-200 outline-none focus:ring-2'
              />
            </div>

            {state.message ? (
              <p
                className='bg-error-container text-on-error-container rounded px-4 py-3 text-sm md:col-span-2'
                role='status'
              >
                {state.message}
              </p>
            ) : null}
          </div>

          <div className='border-outline-variant flex justify-end gap-3 border-t px-6 py-5'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => dialogRef.current?.close()}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={pending}>
              {pending ? (
                <span className='inline-flex items-center justify-center gap-2'>
                  <ButtonSpinner />
                  Salvando...
                </span>
              ) : (
                'Salvar cliente'
              )}
            </Button>
          </div>
        </form>
      </dialog>
    </>
  )
}
