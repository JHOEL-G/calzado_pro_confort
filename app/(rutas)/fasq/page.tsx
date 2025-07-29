'use client'

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
// Asumo que tienes un componente de icono como 'ChevronDown' o puedes usar SVG directamente
// import { ChevronDown } from 'lucide-react'; // Si usas Lucide o similar

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: '1',
        question: '¿Cómo me registro en el dashboard?',
        answer: 'Para registrarte, haz clic en el botón "Registrarse" en la esquina superior derecha de la página. Completa el formulario con tu información y sigue las instrucciones para verificar tu cuenta.'
    },
    {
        id: '2',
        question: '¿Cuáles son las características principales del dashboard?',
        answer: 'Nuestro dashboard ofrece gestión de productos, seguimiento de pedidos, un calendario de eventos, análisis de ventas y herramientas de configuración personalizadas para tu empresa.'
    },
    {
        id: '3',
        question: '¿Puedo acceder al dashboard desde mi dispositivo móvil?',
        answer: 'Sí, nuestro dashboard es completamente responsivo y está optimizado para su uso en dispositivos móviles, tabletas y ordenadores de escritorio.'
    },
    {
        id: '4',
        question: '¿Cómo puedo contactar al soporte técnico?',
        answer: 'Puedes contactar a nuestro equipo de soporte a través de la sección "Contacto" en el menú principal, enviando un correo electrónico a soporte@tuempresa.com, o utilizando el chat en vivo disponible en el dashboard.'
    },
    {
        id: '5',
        question: '¿Hay algún costo por usar el dashboard?',
        answer: 'Ofrecemos diferentes planes que se adaptan a las necesidades de tu empresa. Puedes consultar los detalles de cada plan en la sección "Planes" para ver las características y precios.'
    }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-transparent flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 dark:text-gray-100">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl rounded-xl p-6 sm:p-8">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-8 text-center">
                    Preguntas Frecuentes (FAQ)
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
                    Bienvenido a nuestra sección de Preguntas Frecuentes (FAQ) diseñada
                    específicamente para brindarte respuestas rápidas y claras sobre el
                    dashboard para empresas que hemos desarrollado con pasión y
                    dedicación.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
                    En nuestra página de FAQs, encontrarás una recopilación de las
                    preguntas más comunes que nuestros usuarios suelen hacer sobre el
                    funcionamiento, características y uso de nuestro dashboard. Desde
                    cómo registrarte en la plataforma hasta cómo aprovechar al máximo
                    sus funciones, hemos reunido una lista exhaustiva de interrogantes
                    para ofrecerte la mejor experiencia posible.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 text-center">
                    Nuestro equipo se ha esforzado por proporcionar respuestas
                    detalladas y fáciles de entender para garantizar que encuentres la
                    información que necesitas de manera rápida y sencilla. Si no
                    encuentras la respuesta que buscas, no dudes en contactarnos.
                    Estamos aquí para ayudarte en cada paso del camino.
                </p>

                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item) => (
                        <AccordionItem value={item.id} key={item.id}>
                            <AccordionTrigger className="text-xl font-semibold text-gray-800 dark:text-gray-100 ">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="p-5 bg-white dark:bg-transparent text-gray-600 dark:text-gray-200 border-t border-gray-200 dark:border-gray-600">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <p className="text-lg text-gray-700 dark:text-gray-300 mt-10 text-center">
                    Explora nuestras FAQs y descubre cómo nuestro dashboard puede
                    impulsar la eficiencia y el éxito de tu empresa.
                </p>
            </div>
        </div>
    );
}