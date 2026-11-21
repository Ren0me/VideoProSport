"use client"

import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ApertureIcon } from './aperture-icon';
import styles from './accordion.module.scss';

type AccordionIndicator = "chevron" | "aperture"

interface AccordionTriggerProps
  extends React.ComponentProps<typeof AccordionPrimitive.Trigger> {
  indicator?: AccordionIndicator
}

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(styles.item, className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  indicator = "chevron",
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(styles.trigger, className)}
        {...props}
      >
        {children}
        {indicator === "aperture" ? (
          <ApertureIcon className={cn(styles.indicator, styles.aperture)} />
        ) : (
          <ChevronDownIcon className={cn(styles.indicator, styles.chevron)} aria-hidden="true" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={styles.content}
      {...props}
    >
      <div className={cn(styles.contentInner, className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
