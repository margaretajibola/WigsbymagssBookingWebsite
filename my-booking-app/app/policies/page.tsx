// app/policies/page.tsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

    const PoliciesPage = () => {
        const policies: string[] = [
        'Ensure your hair is properly washed and dried before your appointment',
        'Drop off wig 2 - 3 days before your appointment',
        'Non-refundable 20 dollars down payment would be required to book your appointment',
        'You cannot bring other people to your appointment',
        'Extreme cases of lateness would not be accepted and there would be a 15 dollars late charge',
        'Appointments would be cancelled after 45 mins of a no-show if I am not informed of any delays',
        'Please let me know at least 24 hours before your appointment if you decide to cancel',
        'Your appointment may be cancelled or rescheduled to a later date of your choice and your deposit would be refunded in case of emergencies',
      ];

        return (
            <div className='min-h-screen bg-purple-200'>
                <List
                    sx={{
                        listStyleType: 'disc', // or 'circle', 'square', etc.
                        pl: 6, // Add some padding for the bullets
                        '& .MuiListItem-root': {
                        display: 'list-item', // Ensure each ListItem behaves as a list item
                        "&::marker": {
                            color: "black", // set bullet color
                            fontSize: "1.2rem", // optional: make bullets bigger
                            },
                        },
                    }}
                >
                    {policies.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} sx={{color: "black"}}/>
                    </ListItem>
                    ))}
                </List>
            </div>
        );

    };

    export default PoliciesPage
