import React from 'react'
import { Button, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'

const CustomAccordion = ({
  title = 'Products Admin',
  children = null,
  ...rest
}) => {
  return (
    <Accordion allowToggle minW={'62vw'}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {title}
            </Box>
            <Button as="span" mr={'2vw'} textAlign={'right'} onClick={(e) => {
              e.preventDefault();
              rest?.onOpen()
            }}>
              Create new
            </Button>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {children}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {"User Admin"}
            </Box>
            <Button as="span" mr={'2vw'} textAlign={'right'} onClick={(e) => {
              e.preventDefault();
            }}>
              Create new
            </Button>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <>{"Este panel aún está siendo trabajado"}</>
        </AccordionPanel>
      </AccordionItem>

    </Accordion>
  )
}

export default CustomAccordion