interface Tipos {
    parte: 'cpu' | 'internal_hard_drive' | 'memory' | 'motherboard' | 'power_supply' | 'video_card',
    cpu:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        core_count: string, 
        core_clock: string, 
        boost_clock: string, 
        tdp: string, 
        integrated_graphics: string | null, 
        smt: boolean
    }]
    internal_hard_drive:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        capacity: string, 
        price_per_gb: string | null, 
        type: string, 
        cache: string | null, 
        form_factor: string, 
        interface: string
    }]
    memory:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        speed: string, 
        modules: string, 
        price_per_gb: string | null, 
        color: string, 
        first_word_latency: string, 
        cas_latency: string
    }]
    motherboard:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        socket_cpu: string, 
        form_factor: string, 
        memory_max: string, 
        memory_slots: string, 
        color: string
    }]
    power_supply:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        form_factor: string, 
        efficiency_rating: string, 
        wattage: string, 
        modular: string | boolean, 
        color: string | null
    }]
    video_card:[{
        name: string,
        rating: number,
        rating_count: number,
        price_usd: number | null, 
        chipset: string, 
        memory: string, 
        core_clock: string,
        boost_clock: string | null, 
        color: string, 
        length: string
    }]
}

export default Tipos;