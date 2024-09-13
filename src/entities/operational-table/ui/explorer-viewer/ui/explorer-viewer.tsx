import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { Viewer } from '~/entities/explorer'
import { type TableColumn } from '~/entities/explorer/ui/viewer'
import { type OperationalTable, type Row } from '~/entities/operational-table'
import { type ColumnContext } from '~/entities/table-schema'
import { getRole, roles } from '~/entities/user'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { notify } from '~/shared/notification-list-store'
import Spinner from '~/shared/spinner'
import { SortingButton } from '~/shared/table'
import { type Id, c } from '~/utils/core'

export interface Props extends Omit<Viewer.ViewerProps, 'children'> {
  columns: TableColumn<Record<string, unknown>, ColumnContext>[] | undefined
  context: ColumnContext | undefined
  remove: (id: Id) => Promise<OperationalTable>
  update: (row: Row) => Promise<Row>
}

const statusStringMap = {
  '0': 'В работе',
  '1': 'На согласовании',
  '2': 'Согласовано',
  '3': 'Отменено',
  '4': 'Целевые данные',
}

const statusChangeMap = {
  [roles.Approver]: {
    '1': '2',
    '2': '3',
    '3': '2',
  },
  [roles.Admin]: {
    '2': '3',
    '3': '2',
  },
  [roles.Operator]: {
    '0': '1',
    '1': '0',
    '3': '0',
  },
} as const

const statusColorMap = {
  '0': 'gray',
  '1': 'yellow',
  '2': 'green',
  '3': 'red',
  '4': 'blue',
} as const

export const NAME = 'operationlTable-ExplorerViewer'

/**
 * operationlTable-ExplorerViewer
 */
export default function Component(props: Props): JSX.Element {
  const { columns = [], update, remove, ...rootProps } = props

  const operationalTableColumns = useMemo(() => {
    const cloned = [...columns]

    cloned.push({
      accessorKey: '_status',
      name: 'Согласование',
      renderHeader: ({ name }) => name,
      cellProps: {
        style: {
          // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
          padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
          verticalAlign: 'middle',
          textAlign: 'right',
        },
      },
      headerProps: {
        style: {
          textAlign: 'right',
          verticalAlign: 'middle',
        },
      },
      renderCell: ({ item }) => {
        const row = item.data as Row
        const role = getRole()

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [status, setStatus] = useState(row._status)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const updateMutator = useMutation([`${NAME}.update`], update, {
          onSuccess: (_, variables) => {
            setStatus(variables._status)
          },
        })

        return (
          <Flex height='100%' width='100%' align='center' justify='end'>
            {updateMutator.isLoading ? (
              <Spinner />
            ) : (
              <Button
                size={'1'}
                color={statusColorMap[status as '0']}
                onClick={(e) => {
                  e.stopPropagation()
                  updateMutator.mutate({ ...row, _status: statusChangeMap[role as 'Approver'][status as '2'] as '0' })
                }}
              >
                {statusStringMap[status as '0']}
              </Button>
            )}
          </Flex>
        )
      },
    })
    cloned.push({
      accessorKey: 'action',
      name: 'Действия',
      renderHeader: ({ name }) => name,
      cellProps: {
        style: {
          textAlign: 'right',
          // calc(var(--space-2) + var(--space-1)) потом что cellPadding + TextInputPadding
          padding: '0 calc(var(--space-2) + var(--space-1)) 0 calc(var(--space-4) + var(--space-1))',
          verticalAlign: 'middle',
        },
      },
      headerProps: { style: { textAlign: 'right', verticalAlign: 'middle' } },
      renderCell: ({ item }) => {
        const row = item.data as Row

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const removeMutator = useMutation([`${NAME}.remove`], remove, {
          onSuccess: () => {
            notify({ title: 'Удалено', type: 'success' })
          },
          onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
        })

        return (
          <Button
            round={true}
            color='red'
            onClick={(e) => {
              e.stopPropagation()
              removeMutator.mutate(row._id)
            }}
          >
            <Icon name='Trash' />
          </Button>
        )
      },
    })

    cloned.unshift({
      accessorKey: '_id',
      name: 'Системный ID',
      renderHeader: ({ context }) => {
        return (
          <Flex height='100%' align='center' justify='center'>
            <SortingButton
              size='1'
              round={true}
              variant='ghost'
              onChange={(value) => context?.setSort?.({ _id: value })}
              value={context?.sort?._id}
            />
          </Flex>
        )
      },
      cellProps: { width: '1rem', align: 'center' },
      headerProps: { align: 'center', justify: 'center' },
      renderCell: ({ item }) => {
        const row = item.data as Row

        return row._id
      },
    })

    return cloned
  }, [columns])

  return (
    <Viewer.Root {...rootProps} className={c(props.className, NAME)}>
      <Viewer.Table columns={operationalTableColumns} />
    </Viewer.Root>
  )
}

Component.displayName = NAME
