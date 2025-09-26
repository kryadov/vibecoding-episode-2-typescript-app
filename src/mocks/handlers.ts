import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://restcountries.com/v3.1/name/:country', ({ params }) => {
    const { country } = params
    if (country === 'Germany') {
      return HttpResponse.json([
        {
          name: { common: 'Germany' },
          currencies: { EUR: { name: 'Euro', symbol: '€' } },
        },
      ])
    } else {
      return new HttpResponse('Not Found', { status: 404 })
    }
  }),
  http.get('https://api.exchangerate-api.com/v4/latest/:currencyCode', ({ params }) => {
    const { currencyCode } = params
    if (currencyCode === 'EUR') {
      return HttpResponse.json({
        rates: {
          EUR: 1,
        },
      })
    } else {
      return new HttpResponse('Not Found', { status: 404 })
    }
  }),
]
