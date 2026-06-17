import React from 'react'
import { Box } from '@mantine/core'
import { AdminSidebar } from '../pages/admin/components/AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { Outlet } from 'react-router-dom'

export default function AdminLayout () {
    return (
        <Box style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            <AdminSidebar />

            <Box
                style={{
                    flex: 1,
                    marginLeft: 80,
                    transition: 'margin-left 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <AdminHeader />

                <Box
                    component="main"
                    style={{
                        padding: '24px',
                        minHeight: 'calc(100vh - 60px)',
                        background: 'var(--bg)',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}