import { useCallback } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { safeParse } from 'valibot'
import {
  Form,
  FormValues,
  Version,
  fromFormValues,
  getById,
  normalizationConfigSchema,
  toFormValues,
  update,
} from '~/entities/normalization-config'
import { create as createProcess } from '~/entities/process'
import { notify } from '~/shared/notification-list-store'
import { getUserRole, useRole } from '~/shared/roles/lib'
import { UserRole } from '~/shared/roles/types'
import { AccessGuard } from '~/shared/roles/widgets/access-guard'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import Spinner from '~/ui/spinner'
import TextHighlighter from '~/ui/text-highlighter'
import Tooltip from '~/ui/tooltip'
export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs_id'

/**
 * page-Main
 */
function Page(): JSX.Element {
  const { id = '' } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams({ name: '' })
  const name = searchParams.get('name') || ''
  const navigate = useNavigate()

  const { isAdmin } = useRole()
  const hasPermittedToEdit = isAdmin

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const normalizationConfig = fromFormValues(values)
        const { issues } = safeParse(normalizationConfigSchema, normalizationConfig)
        return toNestedErrors(issues)
      },
      initialValues: { name },
    },
    { values: true },
  )

  const values = form.getState().values
  const isCurrent = form.getState().values.last

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      getById.setCache({ id }, data.data)
      if (data.data.v !== form.getState().values.v) {
        navigate(routes.normalizationConfigs_id.getURL(data.data.id))
      } else {
        form.initialize(toFormValues(data.data))
      }
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const createProcessMutator = createProcess.useCache({
    onSuccess: () => {
      notify({ title: 'Запущено', type: 'success' })
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const fetcher = getById.useCache(
    { id },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
  )

  const render = useCallback(
    () => <Form readonly={!isCurrent || !hasPermittedToEdit} />,
    [isCurrent, hasPermittedToEdit],
  )

  return (
    <main className={displayName}>
      <Container p='1.5rem'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1'>
            <Heading>
              {routes.normalizationConfigs_id.getName()}{' '}
              {values.name && <TextHighlighter tooltipContent='Название'>{values.name}</TextHighlighter>}{' '}
              {values.v && (
                <TextHighlighter color='yellow' tooltipContent='Версия'>
                  {values.v}
                </TextHighlighter>
              )}
            </Heading>
          </Section>
        )}

        {fetcher.isLoading && (
          <Flex width='100%' justify='center'>
            <Spinner />
          </Flex>
        )}

        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <Card>
                <Version
                  item={fetcher.data}
                  isProcessCreating={createProcessMutator.isLoading}
                  onCreateProcessButtonClick={() =>
                    createProcessMutator.mutate({ normalizationConfigId: fetcher.data.id })
                  }
                />
              </Card>
            </Section>

            <Section size='1'>
              <FForm
                form={form}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                render={render}
              />
            </Section>

            <Card asChild>
              <Section size='1'>
                <Flex gap='2' direction='row' justify='end'>
                  <Flex gap='2' align='center'>
                    <Tooltip content='Сбросить'>
                      <span>
                        <Button
                          size='1'
                          variant='outline'
                          onClick={() => form.reset()}
                          disabled={!form.getState().dirty}
                        >
                          Сбросить изменения
                        </Button>
                      </span>
                    </Tooltip>
                    <Button
                      loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Сохранить
                    </Button>
                  </Flex>
                </Flex>
              </Section>
            </Card>
          </>
        )}
      </Container>
    </main>
  )
}

Page.displayName = displayName

export default function Component() {
  const role = getUserRole()

  return (
    <AccessGuard allowedRoles={[UserRole.Admin, UserRole.Operator]} currentRole={role} roleIsChecking={false}>
      <Page />
    </AccessGuard>
  )
}
